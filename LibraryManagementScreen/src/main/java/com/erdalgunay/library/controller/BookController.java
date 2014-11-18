package com.erdalgunay.library.controller;

import com.erdalgunay.library.domain.Book;
import com.erdalgunay.library.domain.model.BookModel;
import com.erdalgunay.library.domain.model.BookWithCaptchaModel;
import com.erdalgunay.library.domain.model.CaptchaModel;
import com.erdalgunay.library.service.BookService;

import com.erdalgunay.library.service.CaptchaService;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import java.util.List;

@Controller
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private CaptchaService captchaService;

    private String HOME_PAGE = "books";

    @RequestMapping
    public String getBookPage(){
        return HOME_PAGE;
    }

    @RequestMapping(value="/listAll")
    public @ResponseBody List<Book> getAll() {
        return bookService.listAll();
    }

    @RequestMapping(value="/find")
    public @ResponseBody Book find(@RequestBody BookModel bookModel){
        return bookService.find(bookModel.getId());
    }

    @RequestMapping(value="/save",method=RequestMethod.POST)
    public @ResponseBody String save(@RequestBody BookWithCaptchaModel bookWithCaptchaModel, ServletRequest request){
        CaptchaModel captchaModel = bookWithCaptchaModel.createCaptchaModel();
        captchaModel.setIpAddress(request.getRemoteAddr());
        if(captchaService.captchaIsNotValid(captchaModel)) {
            return "wrongCaptcha";
        }

        BookModel bookModel = bookWithCaptchaModel.createBookModel();
        if(bookModel.isNotValid()) {
            return "failSave";
        }

        bookService.save(bookModel.createBook());

        return "successSave";
    }

    @RequestMapping(value="/update", method=RequestMethod.POST)
    public @ResponseBody boolean update(@RequestBody BookModel bookModel){
        if(bookModel.isNotValid()) {
            return false;
        }
        return bookService.update(bookModel.createBook());
    }

    @RequestMapping(value="/delete",method=RequestMethod.POST)
    public @ResponseBody boolean delete(@RequestBody BookModel bookModel){
         return bookService.delete(bookModel.createBook());
    }
}