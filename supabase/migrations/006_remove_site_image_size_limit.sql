-- Remove the bucket-level file size limit for admin site image uploads.
update storage.buckets
set file_size_limit = null
where id = 'site-images';