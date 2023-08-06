"use client"
import React, {useEffect} from "react";
import translations from "@/i18n.json";
import {Translation} from "@/types/translations";

export const DropDown = ({user}: {user: string}) => {
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  }, [])
  return (<div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {user}
        </a>
        <ul className="dropdown-menu">
          {/*<li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><hr className="dropdown-divider"/></li>*/}
          {/* onClick={(e) => router.push('/admin/logout')}*/}
          <li><a className="dropdown-item" href="/admin/logout">{tr.logout}</a></li>
        </ul>
      </li>

    </ul>
  </div>)
}
