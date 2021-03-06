if('geolocation' in navigator){
    console.log('geo is available');
    let lat, lon, weather, air;
    navigator.geolocation.getCurrentPosition(async pos => {
        try{
            console.log(pos.coords.latitude, pos.coords.longitude)
            lat = pos.coords.latitude.toFixed(2);
            lon = pos.coords.longitude.toFixed(2);
            document.getElementById('latitude').append(lat);
            document.getElementById('longitude').append(lon);
            
            //const apiURL = 'weather/'+lat+','+lon;
            const apiURL = '/weather/'+lat+','+lon;
            const response = await fetch(apiURL);  //send get fetch to backend
            const json = await response.json();   //store response in json
            console.log(json);

            try{
                weather = json.weather;
                document.getElementById('summary').textContent = weather.currently.summary;
                document.getElementById('temperature').textContent = weather.currently.temperature;
                document.getElementById('location').textContent = weather.timezone;
            } catch {
                console.log('could not get weather and city');
            }

            try{
                air = json.airQuality.results[0].measurements[0];
                document.getElementById('air').textContent = "The air quality is: " + air.value + air.unit;
            } catch {
                document.getElementById('air').textContent = "Cannot get air quality in your area";
            }
            document.getElementById("spinner").style.display = "none";
            document.getElementById("data").style.display = "block";
        } catch (error) {
            air = {value: -1};
            console.log('something went wrong',error);
        }

        document.getElementById("submit").addEventListener("click", async function(){
            const firstName = (signedIn) ? profile.ofa : 'Anonymous';
            const Image = (signedIn) ? profile.getImageUrl() : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
            const data = {
            lat,
            lon,
            weather,
            air,
            firstName,
            Image
            }
            const options = {
                method: 'post',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }
            const post_response =  await fetch('/api', options);
            const post_json = await post_response.json();
            console.log('response from our server: ', post_json);
            if(post_json){
                alert('Successfully Checked In');
            }
        });
    });
} else {
    console.log('geo is not available');
}