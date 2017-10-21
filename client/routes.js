import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout'

FlowRouter.route( '/terms', {
    action: function() {
        // Do whatever we need to do when we visit http://app.com/terms.
        console.log( "Okay, we're on the Terms of Service page!" );
    },
    name: 'termsOfService' // Optional route name.
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

