import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout'

FlowRouter.route( '/', {
    action: function() {
       BlazeLayout.render('applicationLayout', {main: 'mainPlay'});
    },
    name: 'mainPlay'
});

let admin = FlowRouter.group({
    prefix: '/admin'
});

admin.route('/', {
    action: function() {
        BlazeLayout.render('applicationLayout', {header: 'adminHeader', main: 'adminHome'});
    },
    name: "admin.home"
});
admin.route('/players', {
    action: function() {
        BlazeLayout.render('applicationLayout', {header: 'adminHeader', main: 'adminPlayers'});
    },
    name: "admin.players"
});
admin.route('/rounds', {
    action: function() {
        BlazeLayout.render('applicationLayout', {header: 'adminHeader', main: 'adminRounds'});
    },
    name: "admin.rounds"
});

