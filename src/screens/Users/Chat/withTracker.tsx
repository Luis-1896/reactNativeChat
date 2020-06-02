import Meteor, {withTracker} from 'meteor-react-native/src/Meteor';
import ChatScreen from './index';


const ChatContainer=withTracker(({id})=>{
    console.log(id);
    Meteor.subscribe('users');
    let user= Meteor.users.find({_id: { $ne: Meteor.userId() }}).fetch();
    return {
        user
    }
})(ChatScreen);

export default ChatContainer;