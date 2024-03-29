package com.weeklycoffee.partner.domain.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
//    List<Product> findByPartnerId(Sort sort, long partnerId);

    @Query(value = "SELECT * FROM PRODUCT p WHERE p.partner_id = :id ORDER BY product_id DESC LIMIT 10", nativeQuery = true)
    List<Product> findByPartnerConnect(@Param("id") long partnerId);

    Page<Product> findByPartnerId(Pageable page, long partnerId);

    Page<Product> findByCompanyName(Pageable page, String companyName);
}
