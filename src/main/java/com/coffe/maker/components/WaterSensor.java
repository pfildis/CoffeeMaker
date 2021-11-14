package com.coffe.maker.components;

public class WaterSensor {
    boolean water;

    public WaterSensor(){
        water = false;
    }

    public void setWater(boolean w){
        this.water = w;
    }

    public boolean hasWater(){
        return water;
    }
}
