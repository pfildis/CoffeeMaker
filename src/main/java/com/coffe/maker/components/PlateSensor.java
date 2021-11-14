package com.coffe.maker.components;

public class PlateSensor {
    public boolean pot;
    public boolean potEmpty;

    public PlateSensor(){
        this.pot = true;
        this.potEmpty = true;
    }

    public boolean hasPot(){
        return pot;
    }

    public boolean hasEmptyPot(){
        return potEmpty;
    }
}
