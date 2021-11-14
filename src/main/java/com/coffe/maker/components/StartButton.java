package com.coffe.maker.components;

public class StartButton implements Button{
    boolean pressed;

    public StartButton(){
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
