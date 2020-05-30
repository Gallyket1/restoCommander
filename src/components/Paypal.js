import React, { Component } from 'react'
import {
  View,
  ActivityIndicator, TouchableOpacity, Text
} from 'react-native'
//import { URL, URLSearchParams } from 'whatwg-url';
import {authorization} from "./Config";
import { WebView } from 'react-native-webview';
import AfterPayment from "./AfterPayment";
import { AsyncStorage } from 'react-native';
import {payPalBody} from "./payPalBody";

export default class Paypal extends Component {

  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null,
    data: [],
    success: false
  }

  componentDidMount() {
    this.test()
  }

  test = async () => {
    let {toPay} = this.props.route.params
    const dataDetail = payPalBody(toPay)
    const details = {
      'grant_type': 'client_credentials'
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //const qs = require('querystring');

    const first_resp = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorization // Your authorization value
      },
      body: formBody
    })
    const first_json = await first_resp.json()
    console.log(first_json)

    this.setState({
      accessToken: first_json.access_token
    })
    console.log(this.state.accessToken)

    const secon_resp = await fetch('https://api.sandbox.paypal.com/v1/payments/payment',{
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${this.state.accessToken}`
        },
        body: JSON.stringify(dataDetail)
      }
    )
    const second_json = await secon_resp.json();
    console.log(second_json)

    const { id, links } = second_json
    console.log(links)
    const approvalUrl = links[1]
    setTimeout(() => {
      this.setState({
        paymentId: id,
        approvalUrl: approvalUrl.href
      })
    }, 0)
  }

  _onNavigationStateChange = async (webViewState) => {
    console.log(webViewState.url)
    if (webViewState.url.includes('https://example.com/')) {
      this.clearLocalStorage()
      this.setState({
        approvalUrl: null,
        success: true
      })

      let regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while (match = regex.exec(webViewState.url)) {
        params[match[1]] = match[2];
      }
      console.log(params)

      //const { PayerID, paymentId } = webViewState.url

      const third_response = await fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${params.paymentId}/execute`,{
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${this.state.accessToken}`
        },
        body: JSON.stringify({ payer_id: params.PayerID })
      });

      const third_json = await third_response.json();

      //console.log(third_json.payer.payer_info.first_name)

     /* axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.accessToken}`
          }
        }
      )
        .then(response => {
          console.log(response)

        }).catch(err => {
        console.log({ ...err })
      })*/

    }
  }

  clearLocalStorage = async () =>{
    return await AsyncStorage.clear()
  }

  displayError() {
    alert(
      "no_internet",
      "require_internet_connection",
      [
        { text: 'OK', onPress: () => this.props.navigation.goBack() },
      ],
      { cancelable: false });
  }

  render() {

    const { approvalUrl, success } = this.state
    console.log(success)

    //const {navigate} = this.props.navigation

    if(success) {
      return (
          <AfterPayment
            navigation={this.props.navigation}
          />
      )
    }return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        {
          approvalUrl ? <WebView onError={() => this.displayError()}
            source={{ uri: approvalUrl }}
           onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
          /> : <ActivityIndicator size={70}/>
        }
      </View>
    )
  }
}
