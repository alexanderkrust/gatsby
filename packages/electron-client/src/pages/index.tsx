/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* import { useEffect } from "react" */
import React, { Fragment } from "react"
import Editor from "blocks-ui"
import * as Blocks from "@blocks/react"
import { createPages } from "gatsby/src/services/create-pages"

const JSX = `
import React from "react";
import { Blocks, QuoteBasic, HeaderLogo2 } from "@blocks/react";
export default (() => {
  React.useEffect(() => {
    console.log('say hi');
  }, []);
  return <Blocks.Root><QuoteBasic>
      <QuoteBasic.Content sx={{
        bg: "highlight"
      }}>Science is magic that works.</QuoteBasic.Content>
      <QuoteBasic.Author>Kurt Vonnegut</QuoteBasic.Author>
    </QuoteBasic><HeaderLogo2>
      <HeaderLogo2.Logo to="/" />
      <HeaderLogo2.Nav>
        <HeaderLogo2.Link to="/about">About</HeaderLogo2.Link>
        <HeaderLogo2.Link to="/blog">Blog</HeaderLogo2.Link>
        <HeaderLogo2.Link to="/contact">Contact</HeaderLogo2.Link>
      </HeaderLogo2.Nav>
    </HeaderLogo2></Blocks.Root>;
});
`

const Layout = props => <div className="layout">{props.children}</div>

const IndexPage = () => {
  React.useEffect(() => {
    global.ipcRenderer.addListener(`getProjects-reply`, (_event, args) => {
      console.log(args)
    })

    global.ipcRenderer.send(`getProjects`)
  }, [])

  const onClick = () => {
    const bla = createPages({})
    alert(bla)
  }

  return (
    <Fragment>
      {/* <SEO title="Demo" /> */}
      <button onClick={() => onClick()}>Click me</button>
      <Editor src={JSX} blocks={Blocks} layout={Layout} />
    </Fragment>
  )
}

export default IndexPage

/*   const onSayHiClick = () => {
    global.ipcRenderer.send(`build`)
  } */
