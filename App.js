import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {build} from 'search-params';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const token = process.env.token;

const GET_COLLECTION = gql`
  query {
    stories {
      edges {
        node {
          id
          title
          picture {
            id
            contentUrl
          }
        }
      }
    }
  }
`;

const App = () => {
  const {data} = useQuery(GET_COLLECTION);

  console.log(data);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <Text>Bookinou test</Text>
        <Text>Welcome: {JSON.parse(data)}</Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>Get me all the info</Text>
        </View>
      </View>
    </>
  );
};

const client = new ApolloClient({
  uri: 'https://api-v2.7-dev.mybookinou.com/api/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjUyMTI3NzIsImV4cCI6MTYyNTIxNjM3Miwicm9sZXMiOlsiUk9MRV9VU0VSX0FQUCJdLCJ1c2VybmFtZSI6InRlY2huaWNhbF90ZXN0QGJvb2tpbm91LmNvbSJ9.dJYz_MHPWreTiC2DEaJyMYTOxihnBoH-mvfcRpkGfsUg1oviFdJWXRYVfcU_cbde4n9w8FyMvL_oKoAXLBlA5g_Llf_DIOVjgI1jTYzlhzChcvKrWawO76MvLeblIF8N8pAMVEKqJkn9JbAeqTP-19capEMzFdrW-TiwF3v78V5DYOs1bGAXI1tOdg9Da4Kf7guXK3SUto6TtBH-7iScwg45b6OaLRJmb1F6NKLHj-IupV25jpxDIKd8X0117tGJEG2L5yATmYijo7iCH8RYwh9RK4Xh7jcVWOOsxLH08zjMkkqIFxJQELBfoKwV3dgY1Rs1We9qToxqjTzsatPYggvNklA9XN-PrkCj8Bdmgxwz9FwcKhGaokTrUahmdLkxuScNp2uZH-X5D_3V4ZSnl3Gd2JP0c_6Dc-CPre9a4LdAMW662oJohzkwVLMq8P9f7mgHHOfylHSkU9-2XBHwXY1Rr-x2R5mE6ecJxPmmUwPgAuOPT8J235htCRWnoHy39lt8pat-ZWHZSq1lvaqhEHHzFTqniTo0i98mra-J-rsj86nc4vroNyxf5TN2hOY8wYPOxB5eEDsX088zzx_prQebn5qGtyvMAzSke_QRaS0LQEiWW43RAlv0Z0Exd3JW7vr79kBP67vIC18pzIZrWx_59Z9D_D_1jJ4yt6TylvI',
  },
});

export default function AppWired() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#0645AD',
  },
  buttonText: {
    color: '#fff',
  },
});
