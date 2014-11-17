package com.erdalgunay.library.domain.builder;


import com.erdalgunay.library.domain.model.CaptchaModel;

public class CaptchaModelBuilder {
    private String imageWord;
    private String ipAddress;
    private String answer;

    public CaptchaModel build(){
        CaptchaModel captchaModel = new CaptchaModel();
        captchaModel.setAnswer(answer);
        captchaModel.setImageWord(imageWord);
        return captchaModel;
    }

    public CaptchaModelBuilder imageWord(String imageWord) {
        this.imageWord = imageWord;
        return this;
    }

    public CaptchaModelBuilder ipAddress(String ipAddress) {
        this.ipAddress = ipAddress;
        return this;
    }

    public CaptchaModelBuilder answer(String answer) {
        this.answer = answer;
        return this;
    }
}
