package com.erdalgunay.library.repository;

import com.erdalgunay.library.domain.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface BookRepository extends MongoRepository<Book, String>{

    @Query("{ '_id' : ?0 }")
    Book findBy(String _id);

    Book findByName(String name);

}