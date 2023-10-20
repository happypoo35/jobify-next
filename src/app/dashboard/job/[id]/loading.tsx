import { Form, FormContainer } from "@/components/Form";
import Button from "@/components/Button";
import Input from "@/components/Input";

const loading = () => {
  return (
    <FormContainer>
      <Form>
        <h2 data-h3>Edit job</h2>
        <section>
          {Array(5)
            .fill(0)
            .map((_, id) => (
              <Input key={id} name="" data-loading />
            ))}
          <div data-buttons>
            <Button type="submit" disabled>
              Save changes
            </Button>
            <Button variant="inline" type="reset" disabled>
              Reset changes
            </Button>
          </div>
        </section>
      </Form>
    </FormContainer>
  );
};
export default loading;
