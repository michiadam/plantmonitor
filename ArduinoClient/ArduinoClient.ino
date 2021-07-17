#include <WiFi.h>
#include <HTTPClient.h>

const char* serverName  =  "http://10.0.0.14/sensor";
const char* ssid = "A1-E2E17B";
const char* password =  "6Z96AX6LGA" ;


#define SensorPin 34
int sensorValue = 0; 


void setup() {

  Serial.begin(115200);


  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

} 

void loop() {
  if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      
      sensorValue = analogRead(SensorPin);  
      float value = 100.0- map(float(sensorValue), 1200.0, 3500.0, 0.0, 100.0);  
      String returnal = "{\"name\": \"Chicken Teendie\", \"sensordata\": "+String(value)+"}";
      Serial.println(returnal);
      // Your Domain name with URL path or IP address with path
     
      http.begin(serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");
      // Data to send with HTTP POSTZ
       // Send HTTP POST request
      int httpResponseCode = http.POST(returnal.c_str());
      
 
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    } 



     
    delay(1000 * 60 * 5);
}
