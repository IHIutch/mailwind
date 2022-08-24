import {
  Mjml,
  MjmlHead,
  MjmlPreview,
  MjmlTitle,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
  MjmlText,
  render,
  MjmlDivider,
  MjmlSpacer,
} from 'mjml-react'

export default function getMjMl(json) {
  return render(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Last Minute Offer</MjmlTitle>
        <MjmlPreview>Last Minute Offer...</MjmlPreview>
      </MjmlHead>
      <MjmlBody width={600}>
        <MjmlSection fullWidth>
          <MjmlColumn>
            {json
              ? json.map((data, idx) => (
                  <DynamicMjmlComponent
                    key={idx}
                    id={data.id}
                    details={data.details}
                    type={data.type}
                  />
                ))
              : null}
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { validationLevel: 'soft' }
  )
}

const BlockType = {
  Text: 'TEXT',
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  Divider: 'DIVIDER',
  Quote: 'QUOTE',
  Image: 'IMAGE',
  Code: 'CODE',
}

const TextBlock = ({ id, attributes, content }) => {
  return (
    <MjmlText cssClass={`data-${id}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MjmlText>
  )
}

const HeadingBlock = ({ id, type, attributes, content }) => {
  const styles = {
    H1: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    H2: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    H3: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  }

  return (
    <MjmlText cssClass={`data-${id}`} {...styles[type]}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MjmlText>
  )
}

const DividerBlock = ({ id, attributes, content }) => {
  return <MjmlDivider cssClass={`data-${id}`} />
}

const SpacerBlock = () => {
  return <MjmlSpacer />
}

const components = {
  [BlockType.Text]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.Divider]: DividerBlock,
  //
  [BlockType.Quote]: SpacerBlock,
  [BlockType.Image]: SpacerBlock,
  [BlockType.Code]: SpacerBlock,
}

const DynamicMjmlComponent = ({ id, type, details }) => {
  const Component = components['NLAH']
  return (
    <Component
      id={id}
      type={type}
      attributes={details.attributes}
      content={details.value}
    />
  )
}
