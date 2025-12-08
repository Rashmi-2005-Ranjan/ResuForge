package in.resuforge.api.Exception;

public class ResourceExistsException extends RuntimeException {
    public ResourceExistsException(String message) {
        super ( message );
    }
}