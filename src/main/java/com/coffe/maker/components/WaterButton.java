package com.coffe.maker.components;

public class WaterButton implements Button {
    boolean pressed;

    public WaterButton(){
        this.pressed = false;
    }

    @Override
    public void press(){
        this.pressed = !pressed;
    }

    @Override
    public boolean isPressed(){
        return pressed;
    }
}
