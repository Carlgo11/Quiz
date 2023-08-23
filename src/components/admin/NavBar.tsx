import {DropDown} from "@/components/admin/ProfileBtn";
import {cookies} from "next/headers";
import translations from "@/i18n.json";
import {Translation} from "@/types/translations";
import jwt_decode, {JwtPayload} from "jwt-decode";

export const NavBar = () => {
  const token: string|undefined = cookies().get('admin-token')?.value
  const token_decoded: JwtPayload = token ? jwt_decode<JwtPayload>(token || '') : {}
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};

  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">Quiz Admin Panel</a>
          {Object.keys(token_decoded).includes('user') ? (
              <>
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
                <DropDown user={token_decoded.sub as string}/></>
            ) : null}
        </div>
      </nav>
  );
}
