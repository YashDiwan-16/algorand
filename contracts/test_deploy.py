import logging
import deploy

if __name__ == "__main__":
    try:
        deploy.main()
    except Exception as e:
        logging.error(f"Test failed: {e}") 