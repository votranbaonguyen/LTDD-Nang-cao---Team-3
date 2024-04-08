import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserNoti } from '../../redux/user/userSlice';
import NotificationInfo from '../../components/NotificationInfo/NotificationInfo';


const AllNotification = () => {
    const dispatch = useDispatch()
    const {notiList} = useSelector(store => store.userSlice)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await dispatch(getAllUserNoti())
        setRefreshing(false);
        
      }, []);

    const renderNotiList = () => {
        return notiList.map((noti) => {
            let newDate = noti.createdAt.substring(0, noti.createdAt.length - 5);
            newDate = newDate.split("T")
            return <NotificationInfo title={noti.title} info={noti.body} notiTime={newDate[1]} notiDay={newDate[0]}/>
        })
    }

    useEffect(() => {
        dispatch(getAllUserNoti())
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification</Text>
            <ScrollView style={{marginTop: 20}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
                {renderNotiList()}
            </ScrollView>
        </View>

    )
}

export default AllNotification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:50
    },
    title: {
        fontSize: 25,
        fontWeight:"bold",
        marginLeft: 15
    }
})