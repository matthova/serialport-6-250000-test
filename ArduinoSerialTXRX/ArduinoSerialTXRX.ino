void setup() {
  Serial.begin(250000);
  while (!Serial) {;} // Extra handler for usb
}

void loop() {
  if (Serial.available() > 0) {
    Serial.println("RX:" + Serial.readString());
  }
}
