//This code is based on the Heltec LoRaWAN example and recomendations from the LoRa Aliance and The Things Network

#include "LoRaWan_APP.h"
float moistPerc;

//TTN Parameters 
uint8_t devEui[] = { 0x70, 0xB3, 0xD5, 0x7E, 0xD0, 0x06, 0x6A, 0x45 };
uint8_t appEui[] = { 0x23, 0x3D, 0xD5, 0x55, 0x67, 0x77, 0x28, 0x11 };
uint8_t appKey[] = { 0x3B, 0x0E, 0x99, 0x2C, 0xD7, 0x54, 0xA4, 0xD1, 0xB5, 0x29, 0x04, 0x57, 0xB3, 0x64, 0x49, 0x51 };

uint8_t nwkSKey[] = { 0x15, 0xb1, 0xd0, 0xef, 0xa4, 0x63, 0xdf, 0xbe, 0x3d, 0x11, 0x18, 0x1e, 0x1e, 0xc7, 0xda,0x85 };
uint8_t appSKey[] = { 0xd7, 0x2c, 0x78, 0x75, 0x8c, 0xdc, 0xca, 0xbf, 0x55, 0xee, 0x4a, 0x77, 0x8d, 0x16, 0xef,0x67 };
uint32_t devAddr =  ( uint32_t )0x007e6ae1;

/*LoraWan channelsmask, default channels 0-7*/ 
uint16_t userChannelsMask[6]={ 0x00FF,0x0000,0x0000,0x0000,0x0000,0x0000 };

//selecting region
LoRaMacRegion_t loraWanRegion = ACTIVE_REGION;

//LoRa Device Class A 
DeviceClass_t  loraWanClass = CLASS_A;

// application data transmission duty cycle.  value in [ms].
uint32_t appTxDutyCycle = 15000;

/*OTAA or ABP*/
bool overTheAirActivation = true;

/*ADR enable*/
bool loraWanAdr = true;

/* Indicates if the node is sending confirmed or unconfirmed messages */
bool isTxConfirmed = true;

/* Application port */
uint8_t appPort = 2;
//Trial amount 
uint8_t confirmedNbTrials = 4;

//prepare payload text frame
static void prepareTxFrame( uint8_t port )
{
 
  int maxHumid = 1800;  //calib vars
  int minHumid = 4095;
  float value = analogRead(19); // read analog value from sensor

  moistPerc = formatHumid(maxHumid, minHumid, value);   //Formating and calibrating measured value
  Serial.println(moistPerc);

  int int_id = 1;   //Manual Sensor Id
  int int_hum = moistPerc * 10; //remove comma

  appDataSize = 4;
  appData[0] = int_id >> 8;
  appData[1] = int_id;
  appData[2] = int_hum >> 8;
  appData[3] = int_hum;
}

float formatHumid(int min, int max, int curr){
  
  return 100 - (float(curr - min)/(max - min))* 100;

}



void setup() {
  Serial.begin(9600);
  Mcu.begin();
  deviceState = DEVICE_STATE_INIT;
}

void loop()
{

  switch( deviceState )
  {
    case DEVICE_STATE_INIT: //Init
    {
#if(LORAWAN_DEVEUI_AUTO)
      LoRaWAN.generateDeveuiByChipID();
#endif
      LoRaWAN.init(loraWanClass,loraWanRegion);
      break;
    }
    case DEVICE_STATE_JOIN: //Join Network
    {
      LoRaWAN.join();
      break;
    }
    case DEVICE_STATE_SEND: //Send Message
    {
      prepareTxFrame( appPort );  
      LoRaWAN.send();
      deviceState = DEVICE_STATE_CYCLE;
      break;
    }
    case DEVICE_STATE_CYCLE:
    {
      // Schedule next packet transmission
      txDutyCycleTime = appTxDutyCycle + randr( -APP_TX_DUTYCYCLE_RND, APP_TX_DUTYCYCLE_RND );
      LoRaWAN.cycle(txDutyCycleTime);
      deviceState = DEVICE_STATE_SLEEP;
      break;
    }
    case DEVICE_STATE_SLEEP:
    {
      LoRaWAN.sleep(loraWanClass);
      break;
    }
    default:
    {
      deviceState = DEVICE_STATE_INIT;
      break;
    }
  }
}
