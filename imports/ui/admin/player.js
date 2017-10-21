import { Template } from 'meteor/templating';
import './player.html'


Template.player.helpers({
    fullName() {
        return this.first_name + " " + this.last_name
    }
});