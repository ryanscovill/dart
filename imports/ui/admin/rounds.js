import { Template } from 'meteor/templating';
import { Rounds } from '../../api/round';

import './round'
import './rounds'
import './rounds.html'
import './round.html'

Template.adminRounds.onCreated(() => Meteor.subscribe('rounds'));

Template.adminRounds.helpers({
    rounds() {
        return Rounds.find({}, { sort: { createdAt: 1 } });
    },
});
Template.adminRounds.events({
    'submit .new-round'(event) {
        event.preventDefault();

        const target = event.target;
        Meteor.call('rounds.insert', target.time.value);
    },
});