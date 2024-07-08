import Alert from 'react-bootstrap/Alert';

function BasicExample() {
  return (
    <>
      {[
        'light',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          Data yang dicari tidak tersedia
        </Alert>
      ))}
    </>
  );
}

export default BasicExample;