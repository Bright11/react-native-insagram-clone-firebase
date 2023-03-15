import React, { useState } from 'react'
import { FlatList, Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import statusdata from './statusdata';
import statusstyle from './statusstyle';

function Status() {
    const [selectedId,setSelectedId]= useState('')
  return (
    <View style={statusstyle.container}>
      <FlatList
        //     showsVerticalScrollIndicator={false}>
              showsHorizontalScrollIndicator={false}
        data={statusdata}
        horizontal={true}
        renderItem={({ item }) => (
          <Pressable>
            <View key={item.id} style={statusstyle.statusview}>
              <Image style={statusstyle.images} source={item.image}></Image>
              <Text style={statusstyle.statusname}>{item.name}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Status
