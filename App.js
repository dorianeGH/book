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
  headers: {
    authorization: `Bearer ${token}`,
    cache: new InMemoryCache(),
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
