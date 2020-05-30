import { PayPalButton } from "react-paypal-button-v2";
import React, {Component} from 'react'
import WebView from "react-native-webview";

export default class PayPalBouton extends Component {
  render() {
    return (
      <WebView>
        <PayPalButton
          amount="0.01"
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          }}
        />
      </WebView>
    );
  }
}
