import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'

import './round.html'

Template.round.helpers({
    canStartRound() {
        return this.status === 'created';
    },
    canEndRound() {
        return this.status === 'running';
    },
    timeRemainingFormatted() {
        return moment("1900-01-01 00:00:00").add(this.timeRemaining, 'milliseconds').format("mm:ss");
    }

});

Template.round.events({
    'click .start-round'() {
        Meteor.call('rounds.startRound', this._id);
    },
    'click .end-round'() {
        Meteor.call('rounds.endRound', this._id);
    },
});