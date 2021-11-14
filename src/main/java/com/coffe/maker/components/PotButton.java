package com.coffe.maker.components;

public class PotButton implements Button{
    boolean pressed;

    public PotButton(){
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
