import { Template } from 'meteor/templating';
import './player.html'


Template.player.helpers({
    fullName() {
        return this.firstName + " " + this.lastName
    }
});