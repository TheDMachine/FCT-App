var mongoose = require('mongoose');

var states = ['aprobado','cancelado', 'activo', 'banned'];

var EventSchema = new mongoose.Schema({
	eventName :      	{type: String, required: true},
	eventType:          {type: String, required: true},
	eventState:         {type: String, required: true},
	invitedName:        {type: String},
	charityEvent:       {type: String},
	selectAcademies:    {type: String, required: true},
	selectCategories:   {type: String, required: true},
	selectSponsors:     {type: String, required: true},
	costInsc:           {type: String, required: true},
	photo:              {type: String, required: true},
	orgName:      		{type: String},
	orgType:      		{type: String},
	description:  		{type: String},
	date1:        		{type: Date, required: true},
	date2:        		{type: Date, required: true},
	time1:        		{type: Date, required: true},
	time2:        		{type: Date, required: true},
	placeName:    		{type: String, required: true},
	coords:     		{type: Object, required: true},
	seats:        		{type: String, required: true},
	tickets:      		{type: String, required: true},
	ticketPrice:  		{type: String, required: true},
	contactName:  		{type: String, required: true},
	contactPhone: 		{type: String, required: true}
						
});

module.exports = mongoose.model('events', EventSchema);