import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function FormLayout({ setSubmitted }) {
    const preventRefresh = (e) => {
		e.preventDefault()
		fetch("/api/quote", {
			method: "POST",
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				'name': e.target[0].value,
				'message': e.target[1].value
			}),
		}).then((response) => {
			setSubmitted(response)
            e.target.reset()
		})
	}

    return (
    <Form onSubmit={(e) => preventRefresh(e)} action="/api/quote" method="post" id="form">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="input-name">Name</Form.Label>
        <Form.Control type="text" name="name" id="input-name" placeholder="Enter name" required className="!rounded-2xl"/>
      </Form.Group>
      <Form.Group className="mb-20">
        <Form.Label htmlFor="input-message">Quote</Form.Label>
        <Form.Control as="textarea" rows={3} type="text" name="message" id="input-message" placeholder="Type your quote here..." required className="!rounded-2xl"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="primary" type="submit" name="submit" value={"submit"} className="!px-10">Submit</Button>
      </Form.Group>
    </Form>
    )
}