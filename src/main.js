import {renderQuestionPage} from "./render";
import {loadUser} from "./loginPage";
import {postUser} from "./http";

loadUser();
postUser();
renderQuestionPage();
