import React from 'react';
import PaypalButton from './PaypalButton';
import {View} from "react-native";

const CLIENT = {
  sandbox: 'AYaUrRXY2YRM1AhMnMvZ7yCPIt4qQN-vR3syOKbndgmUjBD132sOYjyMOccGEx6gchvI5bwmAlaZMLLE',
  production: 'xxxXXX',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class UsePaypal extends React.Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <View>
        <PaypalButton
          client={CLIENT}
          env={'sandbox'}
          commit={true}
          currency={'USD'}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </View>
    );
  }
}

export default UsePaypal;
