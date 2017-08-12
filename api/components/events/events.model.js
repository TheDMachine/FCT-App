var mongoose = require('mongoose');

var states = ['aprobado','cancelado','banned'];

var EventSchema = new mongoose.Schema({
	eventName :      	{type: String, required: true},
	eventType:          {type: String, required: true},
	eventState:         {type: String, required: true, em:states},
	invitedName:        {type: String, required: true},
	charityEvent:       {type: String},
	selectAcademies:    {type: String, required: true},
	selectCategories:   {type: String, required: true},
	selectSponsors:     {type: String, required: true},
	costInsc:           {type: String, required: true},
	photo:              {type: String, required: true},
	org :               [
						{
							orgName:      {type: String},
							orgType:      {type: String},
							description:  {type: String},
						}
						],
	date : 				[
						{
							date1:        {type: Date, required: true},
							date2:        {type: Date, required: true},
						}
						],
	time : 				[
						{
							time1:        {type: Date, required: true},
							time2:        {type: Date, required: true},
						}
						],
	place: 				[
						{
							placeName:    {type: String, required: true},
							latitude:     {type: String, required: true},
							length:       {type: String, required: true},
							location:     {type: String, required: true},
							seats:        {type: String, required: true},
							tickets:      {type: String, required: true},
							ticketPrice:  {type: String, required: true},
							contactName:  {type: String, required: true},
							contactPhone: {type: String, required: true},
						}
						]
	}
});

module.exports = mongoose.model('events', EventSchema);