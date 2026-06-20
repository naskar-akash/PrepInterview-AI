allowed_extensions = {'pdf', 'doc', 'docx'}

def allowed_file(filename):
    return ( '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions )