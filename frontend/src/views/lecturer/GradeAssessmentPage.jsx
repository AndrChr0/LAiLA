import { useState } from "react";
import SyntaxHighlighterComponent from "../../components/SyntaxHighlighterComponent";

function GradeAssessmentPage() {
  return (
    <>
      <h1>FinalAssessmentPage</h1>
      <div className='flex flex-col w-1/2 gap-8'>
        <SyntaxHighlighterComponent
          language='js'
          codeString='const GradeAssessmentPage = () => {
  return (
    <div>
      <h1>Grade Assessment Page</h1>
    </div>
  );
};
        '
        />
        <SyntaxHighlighterComponent
          language='plaintext'
          codeString='Rugby (sport) 

Rugby union-kamp Argentina - Frankrike

Takling i rugby
Rugby, også kalt rugby-fotball er en lagidrett som spilles på profesjonelt og amatørnivå over hele verden. Det er hovedsakelig to variasjoner av denne idretten, rugby union med 15 spillere og rugby league med 13 spillere på hvert lag. Det finnes også varianten sjumannsrugby av begge rugby-versjonene.

Rugby er en fysisk, hard og krevende idrett med mye fysisk kontakt. Spillerne bruker lite beskyttelse, fra enkle skinnhjelmer, til ikke noe i det hele tatt. Da selv de minste regelbrudd kan føre til alvorlige skader, er det sterkt fokus på spillernes sportslige opptreden, og spillet anses for å være en «gentlemans idrett».

Det som kjennetegner rugby er den ovale ballen, og forbudet mot å kaste ballen fremover; ballen kan bare kastes bakover eller til siden. For å komme frem på banen må spillerne løpe med ballen, eller de kan sparke den fremover. Goal får man ved å sparke ballen over tverrliggeren som står mellom målstengene til motstanderen.'
          filePath='frontend/src/views/lecturer/GradeAssessmentPage.jsx'
        />
      </div>
    </>
  );
}

export default GradeAssessmentPage;
