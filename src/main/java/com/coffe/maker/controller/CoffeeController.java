package com.coffe.maker.controller;

import  com.coffe.maker.components.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/maker")
public class CoffeeController {
    Status status;
    Boiler boiler;
    Light light;
    PlateSensor plateSensor;
    PotButton potButton;
    StartButton startButton;
    Valve valve;
    Warmer warmer;
    WaterButton waterButton;
    WaterSensor waterSensor;

    public CoffeeController(){
        status = Status.OFF;
        boiler = new Boiler();
        light = new Light();
        plateSensor = new PlateSensor();
        potButton = new PotButton();
        startButton = new StartButton();
        valve = new Valve();
        warmer = new Warmer();
        waterButton = new WaterButton();
        waterSensor = new WaterSensor();
    }

    @GetMapping
    public String welcome(){
        return "Welcome to the coffee maker project! :)";
    }

    @GetMapping("/start")
    public String start(){
        if(status == Status.OFF) {
            if (waterSensor.hasWater() == true && plateSensor.hasPot() == true) {
                boiler.on();
                valve.off();
                light.off();
                warmer.off();
                status = Status.BREWING;
                return "Coffe maker is started";
            }
        }
        return "Error";
    }

    @GetMapping("/stop")
    public String stop(){
        boiler.off();
        valve.on();
        light.off();
        warmer.off();
        status = Status.OFF;
        return "Coffee maker is closed...";
    }

    @GetMapping("/takePot")
    public String takePot(){
        if(status == Status.DONE){
            plateSensor.pot = false;
            status = Status.TAKE;
            return "Pot Removed";
        }
        if(status == Status.BREWING){
            plateSensor.pot = false;
            boiler.off();
            valve.on();
            light.off();
            warmer.off();
            status = Status.WAITING;
            return "Pot Removed";
        }
        return "Error";
    }

    @GetMapping("/placePot")
    public String placePot(){
        if(status == Status.TAKE){
            plateSensor.pot = true;
            status = Status.DONE;
            return "Pot is placed.";
        }
        if(status == Status.WAITING){
            boiler.on();
            valve.off();
            light.off();
            warmer.off();
            status = Status.BREWING;
            return "Pot is placed and brewing start.";
        }
        return "Error";
    }

    @GetMapping("/fillTank")
    public String fillTank(){
        if(status == Status.OFF){
            waterSensor.setWater(true);
            return "Water tank has been filled";
        }
        return "Error";
    }

    @GetMapping("/setDone")
    public String setDone(){
        if(status != Status.WAITING){
        boiler.off();
        valve.on();
        light.on();
        warmer.on();
        waterSensor.setWater(false);
        status = Status.DONE;
        return "Status is set to the DONE.";
        }
        return "Error";
    }
}

/*Status off the coffee machines;
* -OFF:
* BREWING:
* WAITING:
* DONE:
* TAKE: brewing is completed and pot is taken for pouring coffee to a cup*/
enum Status{
    OFF, BREWING, WAITING, DONE, TAKE
}
