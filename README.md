# MMM-AirNow

## LostVector fork

![Air now](airquality_lostvector.png "Air now.")

This fork incorporates the following changes.

1. The O3 and PM2.5 metrics use subscripts for better readability.
2. The custom css styling that is mostly inconsistent with the default MagicMirror CSS styling is removed.
3. Table alignment has been adjusted to what I feel is better overall.
4. Emoji icons are now displayed along with the textual description of the air quality. Pictorial elements are recognized and parsed faster than text.
5. A new showLocation boolean has been added to the config which defaults to false. 
I expect the vast majority of users are displaying the air quality where they live and do not need to waste space displaying that location.
In addition, it's arguably better and more space efficient to just hardcode the location text in the header.

## Original readme

![Air now](airquality.png "Air now.")

This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror/tree/develop). This module shows air quality based on the US AirNow API.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/nigel-daniels/MMM-AirNow`.  A new folder `MMM-AirNow` will appear, navigate into it.
2. Execute `npm install` to install the node dependencies.

## Config
The entry in `config.js` can include the following options:

|Option|Description|
|---|---|
|`api_key`|**Required** This is the API key you need to use to request Air Quality Index (AQI) data from the AirNow site.  To request an API key visit the AirNow API site [here](https://docs.airnowapi.org/account/request/)<br><br>**Type:** `string`<br>**Default Value:** `null`|
|`zip_code`|**Required** The US location about which you are requesting AQI data.<br><br>**Type:** `string`<br>**Default value:** `null`|
|`interval`|How often the weather is updated.<br><br>**Type:** `integer`<br>**Default value:** `900000 // 15 minutes`|

Here is an example of an entry in `config.js`
```
{
    module:		'MMM-AirNow',
    position:	'top_left',
    config:		{
                api_key:	'your-api-key',
                zip_code:	'20500'
                }
},
```

## Dependencies
- [request](https://www.npmjs.com/package/request) (installed via `npm install`)

## Notes
Enjoy this module it's a port of one I had in a home-brew mirror project I had prior to moving to using MM2.

## Thanks To...
- [Michael Teeuw](https://github.com/MichMich) for the [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) framework that made this module possible.
- [Sam Lewis](https://github.com/SamLewis0602) whose [MMM-Traffic](https://github.com/SamLewis0602/MMM-Traffic) module I use and whose code I learnt a great deal from.
- [AirNow API Site](https://docs.airnowapi.org) for the helpful guides and information they publish on their APIs.
