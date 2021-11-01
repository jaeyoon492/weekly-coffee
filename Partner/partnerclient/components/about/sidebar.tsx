import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../about/sidebar.module.css";
import Profile from "../profile/profile";

export default function Sidebar() {
  return (
    <nav className={styles.nav}>
      <Head>
        <title>파트너메인</title>
      </Head>
      <div className="mx-auto">
        <Profile />
      </div>
      <Link href="/">
        <a>상품등록</a>
      </Link>
      <Link href="/">
        <a>상품관리</a>
      </Link>
      <Link href="/">
        <a>주문관리</a>
      </Link>
    </nav>
  );
}