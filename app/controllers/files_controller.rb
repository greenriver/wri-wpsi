class FilesController < ApplicationController
  def show
    file_upload = FileUpload.find(params[:id])
    redirect_to url_for(file_upload.file)
  end
end
