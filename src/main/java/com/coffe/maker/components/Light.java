package com.coffe.maker.components;

public class Light implements OnOffDevice{
    boolean status;

    public Light(){
        this.status = false;
    }

    @Override
    public void on(){
        status = true;
    }

    @Override
    public void off(){
        status = false;
    }

    @Override
    public boolean isOn(){
        return status;
    }
}
