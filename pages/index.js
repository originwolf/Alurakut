import MainGrid from './../src/components/MainGrid';
import Box from './../src/components/Box';
import React, { useState, useEffect } from "react";
import { AlurakutMenu, OrkutNostalgicIconSet } from './../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}}></img>
    </Box>
  )
}

function buscaDados() {
  const url = "https://api.github.com/users/originwolf/followers";
  return fetch(url)
    .then(async (response) => await response.json())
    .then(async (dados) => {
      return await dados;
    })
    .catch((err) => console.error("Erro ao buscar dados", err));
}

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

export default function Home() {
  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    buscaDados().then((dados) => setSeguidores(dados));
  }, []);
  
  const githubUser = 'originwolf';

  const pessoasFavoritas = [
    'Everton-Afonso', 
    'nettuf', 
    'GVenancio', 
    'matheuefranco', 
    'printf-ana', 
    'mleitejunior'
  ]

  console.log(seguidores);

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      {/* <Box style="grid-area: profileArea;"> */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>
      </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas da comunidade ({seguidores.length})</h2>

          <ul>
            {/* {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`}></img>
                    <span>{itemAtual}</span>
                  </a>
                </li>
              );
            })} */}
            {seguidores.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual.login}`}>
                    <img src={`https://github.com/${itemAtual.login}.png`}></img>
                    <span>{itemAtual.login}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
    </>
  )
}
