import {DropDown} from "@/components/ProfileBtn";
import {cookies} from "next/headers";
import translations from "@/i18n.json";

export const NavBar = () => {
  // @ts-ignore
  const tr = translations[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};

  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">Quiz Admin Portal</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/admin/questions">{tr.questions}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/teams">{tr.teams}</a>
              </li>
            </ul>
          </div>
          {cookies().get('token')?.value ? <DropDown user={'Carl'}/> : <div></div>}
        </div>
      </nav>
  );
}
