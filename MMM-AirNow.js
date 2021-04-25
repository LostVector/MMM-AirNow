/* Magic Mirror Module: MMM-AirNow
 * Version: 1.0.0
 *
 * By Nigel Daniels https://github.com/nigel-daniels/
 * MIT Licensed.
 */

Module.register('MMM-AirNow', {

    defaults: {
            api_key:    '',
            zip_code:   '',
            interval:   900000 // Every 15 mins
    },


    start:  function() {
        Log.log('Starting module: ' + this.name);

        // Set up the local values, here we construct the request url to use
        this.loaded = false;
        this.url = 'https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=' + this.config.zip_code + '&distance=25&API_KEY=' + this.config.api_key;
        this.location = '';
        this.result = null;

        // Trigger the first request
        this.getAirQualityData(this);
    },


    getStyles: function() {
        return ['airnow.css', 'font-awesome.css'];
    },


    getAirQualityData: function(that) {
        // Make the initial request to the helper then set up the timer to perform the updates
        that.sendSocketNotification('GET-AIR-QUALITY', that.url);
        setTimeout(that.getAirQualityData, that.config.interval, that);
    },


    getDom: function() {
        // Set up the local wrapper
        var wrapper = null;

        // If we have some data to display then build the results table
        if (this.loaded) {
            wrapper = document.createElement('div');
		    wrapper.className = 'airnow bright small';

            var airLocation = document.createElement('div');
            airLocation.className = 'airLocation';
            airLocation.innerHTML = this.location;

            var airDetails = document.createElement('table');
			airDetails.className = "small";

            if (this.result !== null) {
                // Build the air quality details
                for (var i=0; i < this.result.length; i++) {

                    var colourClass = '';
                    var catName = '';
                    var iconName = '';

                    switch (this.result[i].Category.Number) {
                        case 1:
                            colourClass = 'good';
                            catName = 'Good';
                            iconName = 'laugh-beam';
                            break;
                        case 2:
                            colourClass = 'moderate';
                            catName = 'Moderate';
                            iconName = 'smile';
                            break;
                        case 3:
                            colourClass = 'sensitive';
                            catName = 'Sensitivity Risk';
                            iconName = 'meh';
                            break;
                        case 4:
                            colourClass = 'unhealthy';
                            catName = 'Unhealthy';
                            iconName = 'frown';
                            break;
                        case 5:
                            colourClass = 'v_unhealthy';
                            catName = 'Very Unhealthy';
                            iconName = 'angry';
                            break;
                        case 6:
                            colourClass = 'hazardous';
                            catName = 'Hazardous';
                            iconName = 'biohazard';
                            break;
                    }

                    var airRow = document.createElement('tr');
                    airRow.className = colourClass;

                    var airParameter = document.createElement('td');
                    airParameter.className = 'airParameter normal';

					var paramHTML = this.result[i].ParameterName;
					if (paramHTML === "O3") {
						paramHTML = "O<sub>3</sub>"
					}
					else if (paramHTML === "PM2.5") {
						paramHTML = "PM<sub>2.5</sub>"
					}
					else {
						// just pass it through
					}
					
                    airParameter.innerHTML = paramHTML;

                    var airAQI = document.createElement('td');
                    airAQI.className = 'airAQI normal';
                    airAQI.innerHTML = this.result[i].AQI;

                    var airName = document.createElement('td');
                    airName.className ='airName ' + colourClass;
                    airName.innerHTML = catName;

                    var airIcon = document.createElement('td');
                    airIcon.className = 'normal airIcon';
                    var airIconSpan = document.createElement('span')
                    airIconSpan.setAttribute('class', 'far fa-fw fa-' + iconName);
                    airIcon.appendChild(airIconSpan);

                    airRow.appendChild(airParameter);
                    airRow.appendChild(airAQI);
                    airRow.appendChild(airName);
                    airRow.appendChild(airIcon);

                    airDetails.appendChild(airRow);
                }
            }

            // Add elements to the now div
            wrapper.appendChild(airLocation);
            wrapper.appendChild(airDetails);
        } 
        else {
            // Otherwise lets just use a simple div
            wrapper = document.createElement('div');
            wrapper.innerHTML = 'Loading air quality data...';
        }

        return wrapper;
    },


    socketNotificationReceived: function(notification, payload) {
        // check to see if the response was for us and used the same url
        if (notification === 'GOT-AIR-QUALITY' && payload.url === this.url) {
            // we got some data so set the flag, stash the data to display then request the dom update
            this.loaded = true;
            this.location = payload.location;
            this.result = payload.result;
            this.updateDom(1000);
        }
    }
});
