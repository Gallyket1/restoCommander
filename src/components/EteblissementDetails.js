import React, {useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import Article from "./Article";
import AddToBasket from "./AddToBasket";
import TopToBasket from "./TopToBasket";


export default function EtablissementDetails({navigation, route}){
  let {etsId, etsdeliveryPrice} = route.params;


  let[listArticle, SetListArticle]= useState(articlesList)

  let articles = listArticle.map((article, index) =>
    <TouchableOpacity
      key={index}
      onPress={() => navigation.push('ArticleCheck',
        {options: article.options, photo: article.photo, price: article.price, id: article.id, name: article.name, etsdeliveryPrice})}>
      <Article
        key={index}
        name={article.name}
        description={article.description}
        price = {article.price}
        photo={article.photo}
      />
    </TouchableOpacity>
    )

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {articles}
        </View>
      </ScrollView>
        <TopToBasket
          navigation={navigation}
        />
    </View>
  )
}

const articlesList = [{
  id: 1,
  name: 'Burger Maxi',
  description: '5 chiken wings, 6 bananes plantain ou frites, 2 boissons au choix, sauce au choix ',
  price: '19500 FC',
  photo: require('./chicken.png'),
  options: {
    boissons:[{
      id: 1,
      name: 'Fanta',
    },
      {
        id: 2,
        name: 'Coca',
      },
      {
        id: 3,
        name: 'Sprite',
      }],
    sauces: [{
      id: 1,
      name: 'Ketchup'
    },{
      id: 2,
      name: 'Mayonnaise'
    }
    ],
    accompagements: [{
      id: 1,
      name: 'Frites'
    },{
      id: 2,
      name: 'plantains'
    }
    ],

  },
},
  {
    id: 2,
    name: 'Big Bacon Étudiant',
    description: '5 chiken wings, 3 bananes plantain ou frites, 1 boisson au choix, sauce au choix',
    price: '12000 FC',
    photo: require('./menustudent.png'),
    options: {
      boissons:[{
        id: 1,
        name: 'Fanta',
      },
        {
          id: 2,
          name: 'Coca',
        },
        {
          id: 3,
          name: 'Maltina',
        }],
      sauces: [{
        id: 1,
        name: 'Ketchup'
      },{
        id: 2,
        name: 'Aromate'
      }
      ],
      accompagements: [{
        id: 1,
        name: 'Frites'
      },{
        id: 2,
        name: 'Plantains'
      }
      ],

    },
  },
];

