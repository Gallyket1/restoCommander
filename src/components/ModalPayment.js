import React, { Component, useState } from "react";
import {
  Alert, Button,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput
} from "react-native";


export default function ModalPayment(props) {
  const [modalVisible, setModalVisible] = useState(false);
  //const []
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View>
              <Text>Nom</Text>
              <TextInput
                style={{ height: 20, width: 150, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={5}
              />
              <Text>Adresse</Text>
              <TextInput
                style={{ height: 20, width: 150, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={5}
              />
              <Text>Adresse suite</Text>
              <TextInput
                style={{ height: 20, width: 150, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={5}
              />
              <Text>Téléphone</Text>
              <TextInput
                style={{ height: 20, width: 150, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={5}
              />
            </View>


            <Text style={styles.modalText}>Mode de payment</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "gray", padding: 10 }}
              onPress={() => {props.toCheckout(); setModalVisible(false)}}
            >
              <Image style={{height: 35, width: 110}} source = {require('./PPLogo.png')}/>
            </TouchableHighlight>

            <TouchableHighlight
              disabled={true}
              style={{ ...styles.openButton, backgroundColor: "gray", padding: 10 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image style={{height: 35, width: 100}} source = {require('./Mpesa.png')}/>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "red", borderRadius: 20}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Procéder au payment</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "honeydew",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "green",
    borderRadius: 70,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  }
});

