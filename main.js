/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    StatusBar,
    ActivityIndicator,
} from 'react-native';


import { connect } from 'react-redux';
import * as Action from './Redux/action';

class App extends React.Component {

    state = {
        loading: false
    }

    componentDidMount() {
        console.log(this.props.storeState);
        this.getListApi();
    }

    getListApi = () => {
        var params = {
            data: {},
            onDone: (response) => {
                console.log(response);
                this.hideLoader();
                if (response) {
                    
                }
            }
        }

        this.showLoader();
        this.props.getList(params);
    }

    showLoader = () => {
        this.setState({ loading: true });
    }

    hideLoader = () => {
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={{padding:16}}>
                    <FlatList
                        data={this.props.storeState.list}
                        renderItem={({ item, index }) => <Text>{item.title}</Text>}
                        ItemSeparatorComponent={() => <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#ccc', height: 1 }} />}
                    />
                </View>
                {this.state.loading ? <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#00000090', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View> : null}
            </View>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        storeState: state
    }
}

const mapDispatchFromProps = (dispatch) => {
    return {
        getList: (data) => {
            dispatch(Action.getUserList(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchFromProps)(App);
