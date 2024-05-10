const popup = document.querySelector(".popup"),
 wifiIcon = document.querySelector(".icon i"),
 popupTitle = document.querySelector("#title"),
 popdesc = document.querySelector("#description"),
 reconnectBtn = document.querySelector(".reconnect");
        let isOnline = true, intervalId, timer = 10;


       const checKConnection = async () => {
        try{
            // Try to fetch random api 
            const response = await fetch("https://api.quotable.io/random");
            isOnline = response.status >= 200 && response.status < 300;
         
        }catch (err) {
            isOnline = false;
        }
        timer = 10;
        clearInterval(intervalId);
       handlePopup(isOnline);
       }

       const handlePopup = (status) => {
        if(status) {
            // if status is true (online)
            popupTitle.innerHTML = "Restore Connection";
            popdesc.innerHTML = "Your device is now successfully connected to the internet. ";
            popup.classList.add("online");
            return setTimeout(() => popup.classList.remove("show", "online"), 2000);
        }
        // if status is false (offline)
        
        popupTitle.innerHTML = "Lost Connection";
        popdesc.innerHTML = "You lost your internet connection. We'll attempt to reconnect you in <b>10</b> seconds. "
        popup.classList.add("show");
        
        intervalId = setInterval(() => {
            timer--;
            if(timer === 0) checKConnection();
            popup.querySelector("#description b").innerHTML = timer;
        }, 1000)

       }

    // check when isOnline is true at every 3 section
    setInterval(() => isOnline && checKConnection(), 10000);
    reconnectBtn.addEventListener("click", checKConnection)